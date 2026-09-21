import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class ConcatNode extends BaseNode {
    readonly typeId = 'string-concat';
    readonly displayName = 'Concatenate';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'String 1', acceptsType: 'core:string' },
        { name: 'String 2', acceptsType: 'core:string' }
    ];

    readonly dynamicInputs = { baseName: 'String', acceptsType: 'core:string' };

    readonly outputs: OutputDefinition[] = [
        { name: 'Result', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'separator',
            label: 'Separator',
            description: 'Delimiter placed between concatenated strings',
            type: 'string',
            defaultValue: ''
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const separator = String(properties['separator'] || '');
        const items: string[] = [];

        for (let i = 1; i <= 200; i++) {
            const key = `String ${i}`;
            if (inputs[key] !== undefined && inputs[key] !== null) {
                items.push(String(inputs[key]));
            }
        }

        return { 'Result': items.join(separator) };
    }
}
