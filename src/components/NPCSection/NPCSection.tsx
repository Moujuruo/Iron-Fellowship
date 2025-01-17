import {
  LocationDocumentWithGMProperties,
  NPC,
} from "stores/sharedLocationStore";
import { FilterBar } from "./FilterBar";
import { NPCList } from "./NPCList";
import { useFilterNPCs } from "./useFilterNPCs";
import { OpenNPC } from "./OpenNPC";
import { Box, Hidden, List, ListItemButton, ListItemText } from "@mui/material";
import { useAuth } from "providers/AuthProvider";
import { EmptyState } from "components/EmptyState/EmptyState";

export interface NPCSectionProps {
  worldOwnerId: string;
  worldId: string;
  locations: { [key: string]: LocationDocumentWithGMProperties };
  npcs: { [key: string]: NPC };
  openNPCId?: string;
  setOpenNPCId: (npcId?: string) => void;
  isSinglePlayer?: boolean;
}

export function NPCSection(props: NPCSectionProps) {
  const {
    worldOwnerId,
    worldId,
    locations,
    npcs,
    openNPCId,
    setOpenNPCId,
    isSinglePlayer,
  } = props;

  const uid = useAuth().user?.uid;
  const isWorldOwner = worldOwnerId === uid;

  const { search, setSearch, filteredNPCs } = useFilterNPCs(locations, npcs);

  if (!worldId || !worldOwnerId) {
    return (
      <EmptyState
        imageSrc="/assets/nature.svg"
        title={"No World Found"}
        message={
          isSinglePlayer
            ? 'Add a world in the "World" tab to allow you to add and view npcs.'
            : "No world found. Your GM can add a world to the campaign in the GM Screen."
        }
      />
    );
  }

  const sortedNPCs = Object.keys(filteredNPCs).sort(
    (l1, l2) =>
      filteredNPCs[l2].createdDate.getTime() -
      filteredNPCs[l1].createdDate.getTime()
  );

  const openNPC = openNPCId ? npcs[openNPCId] : undefined;

  if (openNPCId && openNPC) {
    return (
      <Box
        display={"flex"}
        alignItems={"stretch"}
        maxHeight={"100%"}
        height={"100%"}
      >
        <Hidden smDown>
          <Box overflow={"auto"} flexGrow={1} minWidth={200} maxWidth={400}>
            <List>
              {sortedNPCs.map((npcId) => (
                <ListItemButton
                  key={npcId}
                  selected={npcId === openNPCId}
                  onClick={() => setOpenNPCId(npcId)}
                >
                  <ListItemText
                    primary={npcs[npcId].name}
                    secondary={
                      !isSinglePlayer &&
                      isWorldOwner &&
                      (!npcs[npcId].sharedWithPlayers ? "Hidden" : "Shared")
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Hidden>

        <OpenNPC
          worldOwnerId={worldOwnerId}
          worldId={worldId}
          npcId={openNPCId}
          npc={openNPC}
          locations={locations}
          closeNPC={() => setOpenNPCId()}
          isSinglePlayer={isSinglePlayer}
        />
      </Box>
    );
  }

  return (
    <>
      <FilterBar
        worldOwnerId={worldOwnerId}
        worldId={worldId}
        search={search}
        setSearch={setSearch}
        openNPC={setOpenNPCId}
      />
      <NPCList
        sortedNPCs={sortedNPCs}
        npcs={filteredNPCs}
        locations={locations}
        openNPC={setOpenNPCId}
      />
    </>
  );
}
