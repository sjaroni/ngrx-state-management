import { createAction, props } from "@ngrx/store";

export const showCreateForm = createAction('showForm', props<{value: boolean}>());