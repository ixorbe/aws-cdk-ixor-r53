#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkIxorR53Stack } from '../lib/aws-cdk-ixor-r53-stack';

const app = new cdk.App();
new AwsCdkIxorR53Stack(app, 'AwsCdkIxorR53Stack');
