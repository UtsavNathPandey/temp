export interface ActionsResponsive {
    'actions': {
        'customActions': {
            'action': ItemAction [];
        };
        'defaultActions': {
            'action': ItemAction []
        };
    };
}

export interface ItemAction {
    'name': String;
    'type': String;
    'icon': String;
    'title': String;
    'link'?: String;
    'mappedItems': {
        'view': String;
        'type': String;
        'condition': String;
    };
}
