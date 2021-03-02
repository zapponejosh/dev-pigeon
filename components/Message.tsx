import { Message as Msg } from '../types/types';
const Message = ({ message, self }: { message: Msg; self: boolean }) => (
  <>
    <div>
      <p>
        <strong>{self ? 'Me' : message.author.username}</strong>
      </p>
      <p>{message.message}</p>
    </div>
  </>
);

export default Message;
