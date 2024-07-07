// @mui/material
import Typography from '@mui/material/Typography';
// css
import styles from "../../assets/css/search/searchCard.module.scss";
import { SearchItem } from './interfaceType';

const SearchCard: React.FC<{ item: SearchItem }> = (props) => {

  const highlightText = (value: string, indices: {BeginOffset: number, EndOffset: number}[]) => {
    const result = indices.reduce((str, { BeginOffset: start, EndOffset: end }) => {
      str[start] = `<b>${str[start]}`;
      str[end] = `${str[end]}</b>`;
      return str;
    }, value.split("")).join("");

    return result;
  }
  
  return (
    <div className={styles.item}>
      <Typography className={styles.title}><a className={styles.titleLink} href={props.item.DocumentURI}>{props.item.DocumentTitle.Text}</a></Typography>
      <Typography className={styles.description}><span dangerouslySetInnerHTML={{ __html: highlightText(props.item.DocumentExcerpt.Text, props.item.DocumentExcerpt.Highlights) }} /></Typography>
      <Typography className={styles.link}>{props.item.DocumentURI}</Typography>
    </div>
  )
}

export default SearchCard;
