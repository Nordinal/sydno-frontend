import { StyledComponentsRegistry } from 'SydnoPage/shared';
import 'antd/dist/reset.css';
import '@/app/globals.css';
import { SydnoLayout } from 'SydnoPage/layouts';

export default async function RootLayout(props: {
  children: React.ReactNode;
}) {

  return (
    <html>
      <head />
      <body>
        <StyledComponentsRegistry>
            <SydnoLayout>
              {props.children}
            </SydnoLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}