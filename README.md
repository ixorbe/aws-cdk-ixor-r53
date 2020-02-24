# aws-cdk-ixor-r53 module

## Construct library to add Route53 Resource Records to a Hosted Zone

### Introduction

This will only work with the Route53 setup and Custom CloudFormation resource at Ixor.

### How to use

```typescript
import {R53} from "@ixor/aws-cdk-ixor-r53";
import {Stack, Construct, StackProps} from "@aws-cdk/core";

export class MyStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        new R53(
            this, `r53_${this.node.id}`,
            {
                topicArn: this.node.tryGetContext("r53TopicArn"),
                RecordType: "CNAME",
                Source: "aLoadBalancerDnsName",
                Target: "www.my.domain"
            })
    }
}        
```