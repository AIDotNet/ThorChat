import AgentChat from './AgentChat';
import AgentMeta from './AgentMeta';
import AgentModal from './AgentModal';
import AgentPlugin from './AgentPlugin';
import AgentPrompt from './AgentPrompt';
import AgentTTS from './AgentTTS';
import StoreUpdater, { StoreUpdaterProps } from './StoreUpdater';
import { Provider, createStore } from './store';

type AgentSettingsProps = StoreUpdaterProps;

export const AgentSettings = (props: AgentSettingsProps) => {
  return (
    <Provider createStore={createStore}>
      <StoreUpdater {...props} />
      <AgentPrompt />
      <AgentMeta />
      <AgentChat />
      <AgentModal />
      <AgentTTS />
      <AgentPlugin />
    </Provider>
  );
};
