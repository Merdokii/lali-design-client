import React from 'react';

const Input = React.forwardRef(({ id, label, type = 'text', ...rest }, ref) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        ref={ref}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        {...rest}
      />
    </div>
  );
});

export default Input;