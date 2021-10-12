import * as React from 'react';
import styled from 'styled-components';
import { CustomInput, Button } from 'reactstrap';
import './styles.scss';
import { FormattedMessage } from 'react-intl';
import colors from '../../configuration/colors';

const Wrapper = styled.div`
  border-radius: 6px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 0 0 rgba(90,97,105,0.11), 
  0 4px 8px 0 rgba(90,97,105,0.12), 
  0 10px 10px 0 rgba(90,97,105,0.06), 
  0 7px 70px 0 rgba(90,97,105,0.1);

    ${(p) => p.css}
`;

const RadiosWrapper = styled.div`
display: flex;
justify-content: left;
align-items: center;
padding: 15px 10px 15px 20px;
`;

const Title = styled.h1`
    font-size: 0.8em;
    text-transform: uppercase;
`;

const Footer = styled.div`
  border-radius: 0 0 6px 6px;
  background-color: ${colors['ui-White']};
  color: ${colors['ui-Grey1']};
  font-size: 1.07em;
  line-height: 1.2em;
  padding: 9px 23px;
  text-align: center;
  border-top: 1px solid ${colors['ui-Grey2']};
  margin-top: 0.5rem;

  button {
    border: 1px solid ${colors['ui-primary']};
    border-radius: 4px;
    background-color: #FFFFFF;
    box-shadow: 0 2px 9px 0 rgba(0,0,0,0.03);

    color: ${colors['ui-primary']};
    font-size: 1em;
    font-weight: 600;
    line-height: 1.2em;
    text-align: center;
    margin-left: 10px;
    padding: 9px 30px;
  }

  .circularButton {
    background-color: ${colors['ui-primary']};
    box-shadow: 0 3px 4px 0 rgba(62, 90, 102, 0.16);
    border: 0px;

    i {
      color: white;
      }
    }
`;

const CardHoc = (CardComponent) => {
  const Card = (props) => {
    const {
      title, footer, filter, onClick, check, footerWithAction, css,
    } = props;
    return (
      <Wrapper css={css}>
        {title && <Title>{title}</Title>}
        {filter && (
          <>
            <div className="filterBy">
              <FormattedMessage id="widgets.wizard.filterBy" />
            </div>
            <RadiosWrapper>
              {filter.filters.map((f) => (
                <CustomInput
                  className="radioButton"
                  onChange={filter.handler}
                  value={f.name}
                  name={f.name.concat('-value')}
                  type="radio"
                  label={(
                    <div className="name">
                      <FormattedMessage id={f.translation} />
                    </div>
                )}
                  id={f.name.concat('-value')}
                  checked={filter.checked.concat('-value') === f.name.concat('-value')}
                />
              ))}
            </RadiosWrapper>
          </>
        )}
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <CardComponent {...props} />
        {footer && <Footer>{footer}</Footer>}
        {footerWithAction && (
        <Footer>
          <div className="footer-profile">
            <Button onClick={onClick}><i className="uil uil-plus" /></Button>
            <div className="addDeviceText">
              <FormattedMessage id="widgets.profile.add.device" />
            </div>
            <div className="totalDevices">
              <p>{check?.length}</p>
            </div>

          </div>
        </Footer>
        )}
      </Wrapper>
    );
  };

  Card.WrappedComponent = CardComponent;
  return Card;
};

export default CardHoc;

class Card extends React.PureComponent {
  render() {
    const { css, children } = this.props;
    return (
      <Wrapper css={css}>
        {children}
      </Wrapper>
    );
  }
}

export {
  Card,
};
