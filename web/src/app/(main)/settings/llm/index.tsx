import { Flexbox } from 'react-layout-kit';

import { useProviderList } from './ProviderList/providers';
import ProviderConfig from './components/ProviderConfig';
import Footer from './features/Footer';

const Page = () => {
  const list = useProviderList();

  return (
    <Flexbox gap={24} width={'100%'}>
      {list.map(({ id, ...res }) => (
        <ProviderConfig id={id as any} key={id} {...res} />
      ))}
      <Footer />
    </Flexbox>
  );
};

Page.displayName = 'LlmSetting';

export default Page;
