from airflow.decorators import dag, task
from airflow.utils.dates import days_ago

# Define the DAG
@dag(
    schedule=None,  # Run the DAG on demand
    start_date=days_ago(1),  # Start date for backfilling
    catchup=False,  # Avoid running past dates automatically
    tags=["example", "hello_world"]
)
def hello_world_dag():
    
    @task
    def say_hello():
        return "Hello, World!"
    
    @task
    def print_message(message: str):
        print(f"Message from Airflow: {message}")
    
    # Define task dependencies
    message = say_hello()
    print_message(message)

# Instantiate the DAG
hello_world_dag_instance = hello_world_dag()
