export default function formatLabel(label) {
  return label
    .replace( /([A-Z])/g, ' $1' )
    .replace( /^./, str => str.toUpperCase() )
}