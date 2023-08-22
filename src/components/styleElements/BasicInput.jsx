import { styled } from "styled-components";
import { forwardRef } from "react";

export const BasicInput = forwardRef(
  ({ placeHolder, onChange, inputType }, ref) => {
    return (
      <>
        <BasicInputBox>
          <input
            ref={ref}
            type={inputType ? inputType : "text"}
            placeholder={placeHolder}
            onChange={onChange}
          />
        </BasicInputBox>
      </>
    );
  }
);

const BasicInputBox = styled.div`
  width: 100%;

  input {
    padding: 0 12px;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 4px;
  }
`;
