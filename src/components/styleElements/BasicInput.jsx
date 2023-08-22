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
  display: flex;
  flex-direction: column;

  input {
    margin: 6px auto;
    width: 300px;
    height: 40px;
    padding: 0 12px;
    border: none;
    border-radius: 4px;
  }
`;