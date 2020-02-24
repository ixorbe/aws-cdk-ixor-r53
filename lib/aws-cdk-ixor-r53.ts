import {Construct, CfnOutput} from "@aws-cdk/core";
import {Topic} from "@aws-cdk/aws-sns";
import {CustomResource, CustomResourceProvider} from "@aws-cdk/aws-cloudformation";

export interface R53Props {
  topicArn: string,
  Source: string,
  Target: string,
  RecordType: string
}

export class R53 extends Construct {
  constructor(scope: Construct, id: string, props: R53Props) {
    super(scope, id);

    let topic = Topic.fromTopicArn(this, `r53Topic_${this.node.id}`, props.topicArn);
    let customCfnResource = new CustomResource(
        this, `cfnResource_${this.node.id}`,
        {
          provider: CustomResourceProvider.fromTopic(topic),
          properties: props
        }
    );
    new CfnOutput(
        this, `cfnOutput_${this.node.id}`,
        {
          description: "R53 Custom Resource Message",
          value: customCfnResource.toString()
        });
  }
}