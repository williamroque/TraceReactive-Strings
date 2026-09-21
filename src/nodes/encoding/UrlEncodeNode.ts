import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class UrlEncodeNode extends BaseNode {
    readonly typeId = 'string-url-encode';
    readonly displayName = 'URL Encode';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Text', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Encoded', outputType: 'core:string' }
    ];

    readonly properties: PropertyDefinition[] = [
        {
            name: 'componentOnly',
            label: 'Component Only',
            description: 'Use encodeURIComponent instead of encodeURI',
            type: 'boolean',
            defaultValue: true
        }
    ];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const text = inputs['Text'] !== undefined && inputs['Text'] !== null ? String(inputs['Text']) : '';
        const componentOnly = properties['componentOnly'] !== false;

        if (!text) {
            return { 'Encoded': '' };
        }

        try {
            const encoded = componentOnly ? encodeURIComponent(text) : encodeURI(text);
            return { 'Encoded': encoded };
        } catch {
            return { 'Encoded': text };
        }
    }
}
