import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@affine/admin/components/ui/accordion';
import { buttonVariants } from '@affine/admin/components/ui/button';
import { cn } from '@affine/admin/utils';
import { SettingsIcon } from '@blocksuite/icons/rc';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { cssVarV2 } from '@toeverything/theme/v2';
import { NavLink } from 'react-router-dom';

import { ALL_CONFIGURABLE_MODULES } from '../settings/config';
import { CollapsibleItem, OtherModules } from './collapsible-item';
import { useNav } from './context';

const authModule = ALL_CONFIGURABLE_MODULES.find(module => module === 'auth');
const otherModules = ALL_CONFIGURABLE_MODULES.filter(
  module => module !== 'auth'
);

export const SettingsItem = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { setCurrentModule } = useNav();

  if (isCollapsed) {
    return (
      <NavigationMenuPrimitive.Root
        className="flex-none relative"
        orientation="vertical"
      >
        <NavigationMenuPrimitive.List>
          <NavigationMenuPrimitive.Item>
            <NavigationMenuPrimitive.Trigger className="[&>svg]:hidden m-0 p-0">
              <NavLink
                to={'/admin/settings'}
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                    className: 'w-10 h-10',
                    size: 'icon',
                  })
                )}
                style={({ isActive }) => ({
                  backgroundColor: isActive
                    ? cssVarV2('selfhost/button/sidebarButton/bg/select')
                    : undefined,
                })}
              >
                <SettingsIcon fontSize={20} />
              </NavLink>
            </NavigationMenuPrimitive.Trigger>
            <NavigationMenuPrimitive.Content>
              <ul
                className="border rounded-lg w-full flex flex-col p-1"
                style={{
                  backgroundColor: cssVarV2('layer/background/overlayPanel'),
                  borderColor: cssVarV2('layer/insideBorder/blackBorder'),
                }}
              >
                {ALL_CONFIGURABLE_MODULES.map(module => (
                  <li key={module} className="flex">
                    <NavLink
                      to={`/admin/settings/${module}`}
                      className={cn(
                        buttonVariants({
                          variant: 'ghost',
                          className:
                            'p-1.5 rounded-[6px] text-[14px] w-full justify-start',
                        })
                      )}
                      style={({ isActive }) => ({
                        backgroundColor: isActive
                          ? cssVarV2('selfhost/button/sidebarButton/bg/select')
                          : undefined,
                      })}
                      onClick={() => setCurrentModule?.(module)}
                    >
                      {module}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuPrimitive.Content>
          </NavigationMenuPrimitive.Item>
        </NavigationMenuPrimitive.List>
        <NavigationMenuPrimitive.Viewport className="absolute z-10 left-11 top-0" />
      </NavigationMenuPrimitive.Root>
    );
  }

  return (
    <Accordion type="multiple" className="w-full h-full  overflow-hidden">
      <AccordionItem
        value="item-1"
        className="border-b-0 h-full flex flex-col gap-1 w-full"
      >
        <NavLink
          to={'/admin/settings'}
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
            'justify-start flex-none w-full px-2'
          )}
          style={({ isActive }) => ({
            backgroundColor: isActive
              ? cssVarV2('selfhost/button/sidebarButton/bg/select')
              : undefined,
          })}
        >
          <AccordionTrigger
            className={
              'flex items-center justify-between w-full [&[data-state=closed]>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360'
            }
          >
            <div className="flex items-center">
              <span className="flex items-center p-0.5 mr-2">
                <SettingsIcon fontSize={20} />
              </span>
              <span>Settings</span>
            </div>
          </AccordionTrigger>
        </NavLink>

        <AccordionContent className="h-full overflow-hidden w-full">
          <ScrollAreaPrimitive.Root
            className={cn('relative overflow-hidden w-full h-full')}
          >
            <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] [&>div]:!block">
              {authModule && (
                <CollapsibleItem
                  title={authModule}
                  changeModule={setCurrentModule}
                />
              )}
              {otherModules.length > 0 && (
                <OtherModules
                  moduleList={otherModules}
                  changeModule={setCurrentModule}
                />
              )}
            </ScrollAreaPrimitive.Viewport>
            <ScrollAreaPrimitive.ScrollAreaScrollbar
              className={cn(
                'flex touch-none select-none transition-colors',

                'h-full w-2.5 border-l border-l-transparent p-[1px]'
              )}
            >
              <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
            </ScrollAreaPrimitive.ScrollAreaScrollbar>
            <ScrollAreaPrimitive.Corner />
          </ScrollAreaPrimitive.Root>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
