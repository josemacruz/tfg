import classNames from "classnames";
import keys from "lodash/keys";
import './styles.scss';

const SelectOptions = ({ items, selected, onChange, size, isOpen }) => (
  <ul
    className={classNames("SelectOptions", { open: isOpen })}
    style={size && size > 0 ? { maxHeight: `${30 * size}px` } : {}}
  >
    {isOpen &&
      keys(items).map((key) => (
        <li
          tabIndex="0"
          value={key}
          className={classNames("option", { selected: selected === key })}
          onClick={() => onChange(key)}
          key={key}
        >
          {items[key]}
        </li>
      ))}
  </ul>
);

export default SelectOptions;
