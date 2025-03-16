import boto3
import logging
from botocore.exceptions import ClientError

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def check_pool_exists(client, mwaa_env_name, pool_name):
    """Check if an Airflow pool exists."""
    try:
        response = client.invoke_rest_api(
            Name=mwaa_env_name,
            Path=f"/pools/{pool_name}",
            Method="GET"
        )
        return response.get('RestApiStatusCode') == 200
    except ClientError as e:
        error_response = e.response
        if error_response.get("RestApiStatusCode") == 404:
            return False

        logger.error(f"Error checking pool existence: {error_response}")
        raise Exception(
            f"Error checking pool existence: {error_response.get('RestApiResponse', {}).get('detail', 'Unknown error')}")


def manage_airflow_pool(event, mwaa_env_name):
    """Manage an Airflow pool based on the event request type."""
    resource_props = event["ResourceProperties"]
    pool_name = resource_props["PoolName"]
    pool_slots = int(resource_props["PoolSlots"])
    pool_description = resource_props["PoolDescription"]

    client = boto3.client("mwaa")
    pool_exists = check_pool_exists(client, mwaa_env_name, pool_name)

    request_type = event["RequestType"]
    method = None

    if request_type == "Create":
        if pool_exists:
            raise Exception(f"Pool {pool_name} already exists")
        method = "POST"
    elif request_type == "Update":
        method = "PATCH" if pool_exists else "POST" # Create if pool does not exist
    elif request_type == "Delete":
        if not pool_exists:
            logger.info(f"Pool {pool_name} does not exist, skipping delete.")
            return
        method = "DELETE"
    else:
        raise Exception(f"Unsupported request type: {request_type}")

    try:
        response = client.invoke_rest_api(
            Name=mwaa_env_name,
            Path="/pools" if method == "POST" else f"/pools/{pool_name}",
            Method=method,
            Body={
                "name": pool_name, 
                "slots": pool_slots,
                "description": pool_description,
            } if method != "DELETE" else None,
        )

        status_code = response.get('RestApiStatusCode')
        if status_code not in [200, 201, 204]:
            logger.error(
                f"Unexpected status code {status_code} when {method}ing pool: {response}")
            raise Exception(
                f"Unexpected status code {status_code}: {response.get('RestApiResponse', 'No response body')}")
    except ClientError as e:
        logger.error(f"Error invoking pool API: {e.response}")
        raise Exception(
            f"Error invoking pool API: {e.response.get('RestApiResponse', {}).get('detail', 'Unknown error')}")


def on_event(event, context):
    """Handle CloudFormation events."""
    mwaa_env_name = event["ResourceProperties"]["MwaaEnvName"]
    physical_id = f"{mwaa_env_name}-{event['ResourceProperties']['PoolName']}"

    try:
        if event["RequestType"] in ["Create", "Update", "Delete"]:
            manage_airflow_pool(event, mwaa_env_name)
        return {"PhysicalResourceId": physical_id, "Data": {}}
    except Exception as e:
        logger.error(f"Error processing event: {str(e)}")
        raise


if __name__ == "__main__":
    # Test the function locally
    test_event = {
        "RequestType": "Create",
        "ResourceProperties": {
            "MwaaEnvName": "MyMwaaEnv",
            "PoolName": "test_pool",
            "PoolSlots": 5,
            "PoolDescription": "Test pool description"
        }
    }
    print(on_event(test_event, {}))
