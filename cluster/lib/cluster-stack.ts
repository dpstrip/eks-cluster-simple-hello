import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PrivateCluster } from './myCluster';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as iam from 'aws-cdk-lib/aws-iam';
import { VpcStack } from './vpc-stack';
import * as fs from 'fs';
import * as yaml from 'js-yaml';


export class ClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new VpcStack(
  this, 
  'ekstest-vpc', 
  props)
  .vpc;  
  
  
  
  const cluster = new PrivateCluster(this, 'dps-Cluster', vpc).cluster;
  
  
  
  //Read Deployment config
  const file = fs.readFileSync('../cdk8s/dist/cdk8s.k8s.yaml','utf8');
  const deploymentYaml = yaml.loadAll(file);
  //safeload(file);

  cluster.addManifest('dps-Cluster-app-deployment', deploymentYaml);
  
  }
}
