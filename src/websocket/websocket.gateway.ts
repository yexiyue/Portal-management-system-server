
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
@WebSocketGateway()
export class WebsocketGateway {
  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client:any,@MessageBody() payload: any): string {
    return 'Hello world!';
  }
}
