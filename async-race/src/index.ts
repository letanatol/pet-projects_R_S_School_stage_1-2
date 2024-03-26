import './global.scss';
import { createHeader } from '@components/header/header';

const { body } = document;
const header = createHeader();

body.append(header);
