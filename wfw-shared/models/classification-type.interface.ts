export interface ClassificationTypes {
    classificationType: Array<ClassificationType>;
}

export interface ClassificationType {
    id: string;
    displayName: string;
}

export interface ClassificationMappings {
    classificationMapping: Array<ClassificationMappingItem>;
}

export interface ClassificationMappingItem {
    mapping: string;
    entity: string;
}