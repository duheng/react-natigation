import invariant from 'fbjs/lib/invariant';

var babelPluginFlowReactPropTypes_proptype_NavigationRoute = require('../TypeDefinition').babelPluginFlowReactPropTypes_proptype_NavigationRoute || require('prop-types').any;

const deprecatedKeys = ['tabBar'];

/**
 * Make sure screen options returned by the `getScreenOption`
 * are valid
 */
export default ((screenOptions, route) => {
  const keys = Object.keys(screenOptions);

  const deprecatedKey = keys.find(key => deprecatedKeys.includes(key));

  if (typeof screenOptions.title === 'function') {
    invariant(false, [`\`title\` cannot be defined as a function in navigation options for \`${route.routeName}\` screen. \n`, 'Try replacing the following:', '{', '    title: ({ state }) => state...', '}', '', 'with:', '({ navigation }) => ({', '    title: navigation.state...', '})'].join('\n'));
  }

  if (deprecatedKey && typeof screenOptions[deprecatedKey] === 'function') {
    invariant(false, [`\`${deprecatedKey}\` cannot be defined as a function in navigation options for \`${route.routeName}\` screen. \n`, 'Try replacing the following:', '{', `    ${deprecatedKey}: ({ state }) => ({`, '         key: state...', '    })', '}', '', 'with:', '({ navigation }) => ({', `    ${deprecatedKey}Key: navigation.state...`, '})'].join('\n'));
  }

  if (deprecatedKey && typeof screenOptions[deprecatedKey] === 'object') {
    invariant(false, [`Invalid key \`${deprecatedKey}\` defined in navigation options for \`${route.routeName}\` screen.`, '\n', 'Try replacing the following navigation options:', '{', `    ${deprecatedKey}: {`, ...Object.keys(screenOptions[deprecatedKey]).map(key => `        ${key}: ...,`), '    },', '}', '\n', 'with:', '{', ...Object.keys(screenOptions[deprecatedKey]).map(key => `    ${deprecatedKey + key[0].toUpperCase() + key.slice(1)}: ...,`), '}'].join('\n'));
  }
});