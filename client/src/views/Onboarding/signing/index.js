import React, { useState } from 'react';
import { Col, Divider, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { OnboardPage, TextWithLink } from '../../../components';
import LoginForm from './LoginForm';
import browserLanguage from '../../../helpers/browserLanguage';
import WithIntlProvider from '../../../hoc/WithIntlProvider';
import locale from './locale.json';

function SignIn() {
	const history = useHistory();
	const intl = useIntl();
	const [sendingRequest, setSendingRequest] = useState(false);
	return (
		<OnboardPage
			spinning={sendingRequest}
			messageSpin={intl.formatMessage({ id: 'authentication.spin' })}
			header={{
				title: intl.formatMessage({ id: 'authentication.title' }),
			}}
			form={<LoginForm history={history} homePath="/contacts/all" />}
			footer={
				<>
					<Divider orientation="center">
						<span style={{ color: '#989eb5' }}>
							<FormattedMessage id="authentication.footer.divider.label" />
						</span>
					</Divider>
					<Row gutter={[8, 16]}>
						<Col span={24}>
							<TextWithLink
								title={intl.formatMessage({ id: 'authentication.footer.text' })}
								linkTitle={intl.formatMessage({
									id: 'authentication.footer.link',
								})}
								path="/magiclogin"
							/>
						</Col>
					</Row>
					<Row gutter={[8, 16]}>
						<Col span={24}>
							<TextWithLink
								title={intl.formatMessage({
									id: 'authentication.footer.text1',
								})}
								linkTitle={intl.formatMessage({
									id: 'authentication.footer.link1',
								})}
								path="/signup"
							/>
						</Col>
					</Row>
				</>
			}
		/>
	);
}

export default WithIntlProvider(SignIn, locale, browserLanguage());
