import { message } from 'antd';

export default function copyToClipboard() {
  const el = document.createElement('textarea');

  el.value = document.location.href;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  message.info('Link with filters copied!');
}
