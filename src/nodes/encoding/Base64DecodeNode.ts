import { BaseNode } from '@tracereactive/types';
import type { InputDefinition, OutputDefinition, PropertyDefinition } from '@tracereactive/types';
import { StringsCategory } from '../../category';

export class Base64DecodeNode extends BaseNode {
    readonly typeId = 'string-base64-decode';
    readonly displayName = 'Base64 Decode';
    readonly category = StringsCategory;
    readonly visible = true;

    readonly inputs: InputDefinition[] = [
        { name: 'Base64', acceptsType: 'core:string' }
    ];

    readonly outputs: OutputDefinition[] = [
        { name: 'Text', outputType: 'core:string' },
        { name: 'Success', outputType: 'core:any' }
    ];

    readonly properties: PropertyDefinition[] = [];

    async evaluate(inputs: Record<string, any>, properties: Record<string, any>): Promise<Record<string, any>> {
        const b64 = inputs['Base64'] !== undefined && inputs['Base64'] !== null ? String(inputs['Base64']).trim() : '';

        if (!b64) {
            return {
                'Text': '',
                'Success': false
            };
        }

        try {
            const binString = atob(b64);
            const bytes = Uint8Array.from(binString, m => m.charCodeAt(0));
            const decoded = new TextDecoder().decode(bytes);
            return {
                'Text': decoded,
                'Success': true
            };
        } catch {
            return {
                'Text': '',
                'Success': false
            };
        }
    }
}
