export const applyTilt = (
  e: React.MouseEvent,
  ref: React.RefObject<HTMLElement>,
  maxTilt = 15 // max degrees
) => {
  if (!ref.current) return;

  const rect = ref.current.getBoundingClientRect();
  const x = e.clientX - rect.left; // cursor x relative to container
  const y = e.clientY - rect.top;  // cursor y relative to container

  // map cursor position to rotation (-maxTilt to +maxTilt)
  const rotateY = (0.5 - x / rect.width) * 2 * maxTilt; // now left-right tilt matches cursor
  const rotateX = ((y / rect.height) - 0.5) * 2 * maxTilt; // still invert for X

  // tilt towards cursor
  ref.current.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
};

export const resetTilt = (ref: React.RefObject<HTMLElement>) => {
  if (ref.current) ref.current.style.transform = "rotateX(0deg) rotateY(0deg)";
};
