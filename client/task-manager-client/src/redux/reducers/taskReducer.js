// editorsReducer.js
const initialState = {
    editors: [
      {
        id: 1,
        name: "Editor 1",
        language: "javascript",
      },
    ],
    selectedEditorId: 1,
  };
  
  const editorsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_EDITOR":
        return {
          ...state,
          editors: [...state.editors, action.payload],
        };
      case "REMOVE_EDITOR":
        return {
          ...state,
          editors: state.editors.filter((editor) => editor.id !== action.payload),
          selectedEditorId:
            state.selectedEditorId === action.payload
              ? state.editors.length > 1
                ? state.editors[0].id
                : null
              : state.selectedEditorId,
        };
      case "SELECT_EDITOR":
        return {
          ...state,
          selectedEditorId: action.payload,
        };
      case "UPDATE_EDITOR":
        return {
          ...state,
          editors: state.editors.map((editor) =>
            editor.id === action.payload.id ? { ...editor, ...action.payload.data } : editor
          ),
        };
      default:
        return state;
    }
  };
  
  export default editorsReducer;
  