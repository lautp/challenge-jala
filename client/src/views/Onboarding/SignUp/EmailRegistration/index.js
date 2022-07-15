import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { OnboardPage } from "../../../../components";
import RegistrationForm from "./RegistrationForm";

function EmailRegistration({ nextAction, locale }) {
  const [sending, setSending] = useState(false);
  const intl = useIntl();

  return (
    <OnboardPage
      spinning={sending}
      messageSpin={intl.formatMessage({ id: "registration.spin" })}
      header={{
        title: intl.formatMessage({ id: "registration.title" }),
        content: (
          <p style={{ color: "#989eb5" }}>
            <FormattedMessage id="registration.content" />
          </p>
        ),
      }}
      form={<RegistrationForm nextAction={nextAction} />}
      footer={
        <section>
          <span style={{ color: "#989eb5", paddingRight: "5px" }}>
            <FormattedMessage id="registration.footer.text" />
          </span>
          <Link to="/singing">
            <FormattedMessage id="registration.footer.link" />
          </Link>
        </section>
      }
    />
  );
}

export default EmailRegistration;
