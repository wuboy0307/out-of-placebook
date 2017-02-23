export const TOGGLE_FLYOUT = "TOGGLE_FLYOUT";

export const toggleFlyout = (flyout, data) => ({
  type: TOGGLE_FLYOUT,
  flyout,
  data
});
