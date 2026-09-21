import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class PadNode extends BaseNode {
    readonly typeId = 'string-pad';
    readonly displayName = 'Pad';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' },
        { name: 'Target Length', acceptsType: 'core:number' },
        { name: 'Pad String', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Result', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'targetLength',
            label: 'Target Length',
            description: 'Length of resulting string once padded',
            type: 'number',
            defaultValue: 10
        },
        {
            name: 'padString',
            label: 'Pad String',
            description: 'String used to pad the text',
            type: 'string',
            defaultValue: ' '
        },
        {
            name: 'position',
            label: 'Position',
            description: 'Pad at beginning or end',
            type: 'select',
            defaultValue: 'end',
            options: [
                { label: 'Start (Left)', value: 'start' },
                { label: 'End (Right)', value: 'end' }
            ]
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';
        const targetLength = inputs['Target Length'] !== undefined && inputs['Target Length'] !== null
            ? Number(inputs['Target Length'])
            : Number(properties['targetLength'] || 10);
        const padString = inputs['Pad String'] !== undefined && inputs['Pad String'] !== null
            ? String(inputs['Pad String'])
            : String(properties['padString'] || ' ');
        const position = String(properties['position'] || 'end');

        const result = position === 'start'
            ? text.padStart(targetLength, padString)
            : text.padEnd(targetLength, padString);

        return { 'Result': result };
    }
}
