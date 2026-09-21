import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class StringMetricsNode extends BaseNode {
    readonly typeId = 'string-metrics';
    readonly displayName = 'String Metrics';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Length', outputType: 'core:number' },
        { name: 'Word Count', outputType: 'core:number' },
        { name: 'Line Count', outputType: 'core:number' }
    ];

    readonly properties: PropertyDefinition[] = [];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';

        const length = text.length;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const lines = text.length > 0 ? text.split(/\r\n|\r|\n/).length : 0;

        return {
            'Length': length,
            'Word Count': words,
            'Line Count': lines
        };
    }
}
