import 'reflect-metadata'
import { jsonObject, jsonMember, jsonArrayMember, TypedJSON } from 'typedjson'

const readFile = (file: string) => {
  const decoder = new TextDecoder();
  return decoder.decode(Deno.readFileSync(file))
}

@jsonObject
class Shortcut {
  @jsonMember
  public label: string;
  @jsonMember
  public keys: string;
}

@jsonObject
class ShortcutGroup {
  @jsonMember
  public name: string;
  @jsonArrayMember(Shortcut)
  public items: Shortcut[];
}


@jsonObject
class ShortcutApp {

  @jsonMember
  public name: string;

  @jsonArrayMember(ShortcutGroup)
  public groupings:  ShortcutGroup[];
}

const serializer = new TypedJSON(ShortcutApp);

const parsed = serializer.parse(readFile('./data/sublime.hotkeys.json'));

console.log(parsed);


export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}
