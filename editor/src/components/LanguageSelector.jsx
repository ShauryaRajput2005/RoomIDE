import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { LANGUAGE_VERSIONS } from "../constants";

function LanguageSelector({ language, onSelect }) {
  const languages = Object.entries(LANGUAGE_VERSIONS);

  return (
    <div className="mb-4 mt-4 flex items-center gap-5 text-[#218e5e] bg-[#1e1e1e] border-b border-[#121417]">
      <p className="m-4 font-semibold bg-[#1e1e1e]">Language: &nbsp;</p>

      <Menu
        menuButton={
          <MenuButton className="px-4 py-2 m-2  bg-[#1e1e1e] text-[#218e5e]  border-none ml-4  rounded-md font-semibold hover:scale-[1.03]">
            {language.toUpperCase()}
          </MenuButton>
        }
        align="start"
        transition
        menuClassName="bg-[#151b23] rounded-md p-1"
      >
        {languages.map(([lang, version]) => (
          <MenuItem
            key={lang}
            onClick={() => onSelect(lang)}
            className={`text-[#218e5e] text-sm px-3 py-2 rounded-md hover:bg-[#37373d] ${lang === language ? " font-bold bg-[#37373d] text-green-200 " : ""
              }`}
          >
            <span>{lang}</span>
            <span className="text-white text-xs ml-2">{version}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default LanguageSelector;
