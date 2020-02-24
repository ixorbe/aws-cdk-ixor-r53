import {Construct, CfnOutput} from "@aws-cdk/core";
import {Topic} from "@aws-cdk/aws-sns";
import {CustomResource, CustomResourceProvider} from "@aws-cdk/aws-cloudformation";

export interface R53Props {
    topicArn: string,
    Source: string,
    Target: string,
    Alias?: string,
    AliasHostedZoneId?: string,
    RecordType: string
}

export class R53 extends Construct {
    constructor(scope: Construct, id: string, props: R53Props) {
        super(scope, id);

        if (props.RecordType != "CNAME" && props.RecordType != "A") {
            this.node.addError("RecordType should be one of CNAME or A");
        }
        if (props.AliasHostedZoneId === "Yes" && props.RecordType !== "A") {
            this.node.addError("RecordType should be A for an Alias");
        }
        if (props.Alias === "Yes" && props.AliasHostedZoneId === undefined) {
            // Assume this is for CloudFront (fixed HostedZone Id)
            props.AliasHostedZoneId = "Z2FDTNDATAQYW2";
        }
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