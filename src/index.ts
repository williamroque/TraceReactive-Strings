import { RegexMatchNode } from './nodes/extraction/RegexMatchNode';
import { ContainsNode } from './nodes/extraction/ContainsNode';
import { StartsWithNode } from './nodes/extraction/StartsWithNode';
import { EndsWithNode } from './nodes/extraction/EndsWithNode';
import { StringMetricsNode } from './nodes/extraction/StringMetricsNode';

import { ReplaceNode } from './nodes/transformation/ReplaceNode';
import { TrimNode } from './nodes/transformation/TrimNode';
import { ChangeCaseNode } from './nodes/transformation/ChangeCaseNode';
import { SliceNode } from './nodes/transformation/SliceNode';
import { PadNode } from './nodes/transformation/PadNode';

import { ConcatNode } from './nodes/composition/ConcatNode';
import { TemplateNode } from './nodes/composition/TemplateNode';
import { SplitNode } from './nodes/composition/SplitNode';
import { JoinNode } from './nodes/composition/JoinNode';
import { SplitLinesNode } from './nodes/composition/SplitLinesNode';

import { JsonParseNode } from './nodes/encoding/JsonParseNode';
import { JsonStringifyNode } from './nodes/encoding/JsonStringifyNode';
import { Base64EncodeNode } from './nodes/encoding/Base64EncodeNode';
import { Base64DecodeNode } from './nodes/encoding/Base64DecodeNode';
import { UrlEncodeNode } from './nodes/encoding/UrlEncodeNode';
import { UrlDecodeNode } from './nodes/encoding/UrlDecodeNode';

declare const traceReactive: any;

const nodes = [
    new RegexMatchNode(),
    new ContainsNode(),
    new StartsWithNode(),
    new EndsWithNode(),
    new StringMetricsNode(),
    new ReplaceNode(),
    new TrimNode(),
    new ChangeCaseNode(),
    new SliceNode(),
    new PadNode(),
    new ConcatNode(),
    new TemplateNode(),
    new SplitNode(),
    new JoinNode(),
    new SplitLinesNode(),
    new JsonParseNode(),
    new JsonStringifyNode(),
    new Base64EncodeNode(),
    new Base64DecodeNode(),
    new UrlEncodeNode(),
    new UrlDecodeNode()
];

const serializableNodes = nodes.map(n => ({
    typeId: n.typeId,
    displayName: n.displayName,
    category: n.category,
    nodeInterface: n.nodeInterface,
    visible: n.visible,
    inputs: n.inputs,
    outputs: n.outputs,
    properties: n.properties,
    dynamicInputs: n.dynamicInputs,
    dynamicOutputs: n.dynamicOutputs
}));

traceReactive.registerNodes(serializableNodes);

traceReactive.onEvaluateNode(async ({ typeId, inputs, properties }: any) => {
    const node = nodes.find(n => n.typeId === typeId);
    if (!node) {
        throw new Error(`Unknown node type: ${typeId}`);
    }
    return await node.evaluate(inputs, properties);
});
