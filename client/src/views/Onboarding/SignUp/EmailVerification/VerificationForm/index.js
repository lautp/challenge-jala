import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { CodeVerification } from "../../../../../components";

function VerificationForm({ nextAction }) {
  const onFinish = useCallback(async (codeValue) => {}, [nextAction]);

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
