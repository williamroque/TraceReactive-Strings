import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class SliceNode extends BaseNode {
    readonly typeId = 'string-slice';
    readonly displayName = 'Slice';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' },
        { name: 'Start', acceptsType: 'core:number' },
        { name: 'End', acceptsType: 'core:number' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Result', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'start',
            label: 'Start Index',
            description: 'Zero-based index to begin slice',
            type: 'number',
            defaultValue: 0
        },
        {
            name: 'end',
            label: 'End Index',
            description: 'Zero-based index before which to end slice',
            type: 'number',
            defaultValue: 0
        },
        {
            name: 'useEnd',
            label: 'Specify End Index',
            description: 'If disabled, slice extends to the end of string',
            type: 'boolean',
            defaultValue: false
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';
        const start = inputs['Start'] !== undefined && inputs['Start'] !== null ? Number(inputs['Start']) : Number(properties['start'] || 0);

        const hasEndInput = inputs['End'] !== undefined && inputs['End'] !== null;
        const useEnd = hasEndInput || properties['useEnd'] === true;

        let result: string;
        if (useEnd) {
            const end = hasEndInput ? Number(inputs['End']) : Number(properties['end'] || 0);
            result = text.slice(start, end);
        } else {
            result = text.slice(start);
        }

        return { 'Result': result };
    }
}
