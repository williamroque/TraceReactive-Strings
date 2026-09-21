import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class JoinNode extends BaseNode {
    readonly typeId = 'string-join';
    readonly displayName = 'Join';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Array', acceptsType: 'core:string-array' },
        { name: 'Delimiter', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Result', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'delimiter',
            label: 'Delimiter',
            description: 'Delimiter to join array items with',
            type: 'string',
            defaultValue: ','
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const rawArray = inputs['Array'];
        const delimiter = inputs['Delimiter'] !== undefined && inputs['Delimiter'] !== null
            ? String(inputs['Delimiter'])
            : String(properties['delimiter'] !== undefined ? properties['delimiter'] : ',');

        if (!Array.isArray(rawArray)) {
            return {
                'Result': rawArray !== undefined && rawArray !== null ? String(rawArray) : ''
            };
        }

        const stringItems = rawArray.map(item => item !== undefined && item !== null ? String(item) : '');
        return {
            'Result': stringItems.join(delimiter)
        };
    }
}
