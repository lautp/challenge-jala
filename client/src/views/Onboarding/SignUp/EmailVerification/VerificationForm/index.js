import React, { useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import { CodeVerification } from "../../../../../components";
import { codeUserVerification } from "../../../../../service/userService";

function VerificationForm({ nextAction }) {
  const onFinish = useCallback(async (codeValue) => {
    codeUserVerification(codeValue).then((res) => {
      if (res.status === 200 && res.data.length > 0) {
        nextAction();
      }else{
        alert("Invalid Code");
      }
    });
  });

  return (
    <React.Fragment>
      <CodeVerification onFinish={onFinish} />
      <span style={{ color: "#989eb5" }}>
        <FormattedMessage id="verification.form.message" />
      </span>
    </React.Fragment>
  );
}

export default VerificationForm;
