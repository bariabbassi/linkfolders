import Link from 'next/link';
import styled from 'styled-components';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

const Nav = styled.nav`
  width: 100%;
  margin: 0 2rem;
  display: flex;
  align-items: space-between;
  justify-content: space-between;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin: 0 0 0 30px;
`;

const A = styled.a`
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  padding: 18px;
  margin-top: 30px;
  border-radius: 35px;
  background: #09f;
  &:hover {
    color: #f4f4f4;
    background: #0af;
  }
  &:active {
    background: #4564f5;
  }
`;

const Name = styled.a`
  display: flex;
`;

const Logo = styled.img`
  width: 40px;
  margin-right: 0.5rem;
  padding-bottom: 0.5rem;
`;

const Header = ({ siteEmoji, siteTitle }) => (
  <StyledHeader>
    <Nav>
      <Link href="/">
        <Name>
          <Logo src="/linkfolders.svg" alt="Linkfolders Logo" />
          <h3>{siteTitle}</h3>
        </Name>
      </Link>
      <div>
        <List>
          {/* <Item>
            <h3>
              <Link href="/pricing">
                <a>Pricing</a>
              </Link>
            </h3>
          </Item>
          <Item>
            <h3>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </h3>
          </Item>
          <Item>
            <h3>
              <Link href="/signup">
                <A>Sign up for free</A>
              </Link>
            </h3>
          </Item> */}
        </List>
      </div>
    </Nav>
  </StyledHeader>
);

export default Header;
