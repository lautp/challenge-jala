import React, { useState } from "react";
import { Row, Col } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { OnboardPage, TextWithLink } from "../../../../components";
import AccountForm from "./AccountForm";

function InitialAccountSetting({ userRegistered, gotoHomePage, locale }) {
  const [verifying, setVerifying] = useState(false);
  const intl = useIntl();
  return (
    <OnboardPage
      locale={locale}
      spinning={verifying}
      messageSpin={intl.formatMessage({ id: "account-settings.spin" })}
      header={{
        title: intl.formatMessage({ id: "account-settings.title" }),
        content: (
          <p style={{ color: "#989eb5" }}>
            <FormattedMessage id="account-settings.content" />
          </p>
        ),
      }}
      form={
        <AccountForm gotoHomePage={gotoHomePage} userEmail={userRegistered} />
      }
      footer={
        <>
          <Row gutter={[8, 16]}>
            <Col span={24}>
              <TextWithLink
                title={intl.formatMessage({
                  id: "account-settings.footer.text1",
                })}
                linkTitle={intl.formatMessage({
                  id: "account-settings.footer.link1",
                })}
                path="/cutomer_terms_of_service"
              />
            </Col>
          </Row>
          <Row gutter={[8, 16]}>
            <Col span={24}>
              <TextWithLink
                linkTitle={intl.formatMessage({
                  id: "account-settings.footer.link2",
                })}
                path="/privacy_policy"
              />
              <span style={{ padding: "0 5px", color: "#989eb5" }}>
                <FormattedMessage id="account-settings.footer.text2" />
              </span>
              <TextWithLink
                linkTitle={intl.formatMessage({
                  id: "account-settings.footer.link3",
                })}
                path="/cookie_policy"
              />
            </Col>
          </Row>
        </>
      }
    />
  );
}

export default InitialAccountSetting;
