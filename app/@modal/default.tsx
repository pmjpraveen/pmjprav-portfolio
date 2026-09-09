// Required by Next.js parallel routes: on any route that isn't an
// intercepted /work/[slug] navigation (a hard reload, or any other page),
// the @modal slot renders nothing.
export default function Default() {
  return null;
}
