import Autocomplete from "@mui/joy/Autocomplete";
import Chip from "@mui/joy/Chip";
import Close from "@mui/icons-material/Close";

export default function FavoriteTag() {
  return (
    <Autocomplete
      id="tags-default"
      multiple
      placeholder="Tags"
      options={tags}
      limitTags={2}
      color="info"
      getOptionLabel={(option) => option.title}
      renderTags={(tags, getTagProps) =>
        tags.map((item, index) => (
          <Chip
            key={item.title}
            variant="solid"
            color="primary"
            endDecorator={<Close fontSize="sm" />}
            {...getTagProps({ index })}
          >
            {item.title}
          </Chip>
        ))
      }
    />
  );
}

const tags = [
  { title: "#LOL" },
  { title: "#goodfilms" },
  { title: "#funnyanimals" },
  { title: "#history" },
  { title: "#fantasy" },
];
