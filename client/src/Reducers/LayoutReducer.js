export default function LayoutReducer(state = [], action) {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarOpened: !state.isSidebarOpened };
    default: {
 //     throw new Error('Unhandled action type:' + action.type);
    }
  }
  return {...state}
}
