<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Slack\BlockKit\Blocks\ContextBlock;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;
use Illuminate\Notifications\Slack\SlackMessage;

class SlackNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        protected $header,
        protected $body,
        protected $url,
        protected $notifiedBy,
        protected $model
        ) {
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['slack'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }

    public function toSlack(object $notifiable): SlackMessage
    {
        return (new SlackMessage)
                ->text($this->body)
                ->headerBlock($this->header)
                ->contextBlock(function (ContextBlock $block) {
                    $block->text("Notificación enviada por: {$this->notifiedBy->name}");
                })
                ->sectionBlock(function (SectionBlock $block) {
                    $block->text($this->body)->markdown();
                })
                ->sectionBlock(function (SectionBlock $block) {
                    $url = env('FRONT_URL').$this->url;
                    $block->text("<$url|$url>")->markdown();
                })
                ->dividerBlock()
                ->sectionBlock(function (SectionBlock $block) {
                    if ($this->model) {
                        $this->model->getSlackNotificationBlocks($block);
                    } else {
                        $block->text('No se encontraron detalles para mostrar');
                    }
                })
                ->dividerBlock();
    }
}
