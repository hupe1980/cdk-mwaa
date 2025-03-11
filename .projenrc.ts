import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'hupe1980',
  authorAddress: 'frankhuebner1980@gmail.com',
  cdkVersion: '2.182.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.7.0',
  name: 'cdk-mwaa',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:hupe1980/cdk-mwaa.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['aws-cdk', 'ts-node'], /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  publishToPypi: {
    distName: 'cdk-mwaa',
    module: 'cdk_mwaa',
  },
});

project.tsconfigDev.addInclude('example/**/*.ts');

project.addScripts({
  'example:synth': "yarn cdk synth --app 'ts-node --project tsconfig.dev.json example/main.ts'",
  'example:deploy': "yarn cdk deploy --app 'ts-node --project tsconfig.dev.json example/main.ts'",
  'example:destroy': "yarn cdk destroy --app 'ts-node --project tsconfig.dev.json example/main.ts'",
  'example:diff': "yarn cdk diff --app 'ts-node --project tsconfig.dev.json example/main.ts'",
});

project.gitignore.exclude('cdk.out');

project.synth();