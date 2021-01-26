import { message } from 'antd';

message.config({
  content: 'Link with filters copied!',
  maxCount: 1,
  top: 100 // eslint-disable-line no-magic-numbers
});

export default function copyToClipboard() {
  const el = document.createElement('textarea');

  const url = new URL(document.location.href);

  url.hash = '';

  el.value = url;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  message.info('Link with filters copied!');
}
