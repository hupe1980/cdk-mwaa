import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'hupe1980',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.7.0',
  name: 'cdk-mwaa',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:hupe1980/cdk-mwaa.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();