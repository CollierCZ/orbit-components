// @flow
import * as React from "react";
import { storiesOf, setAddon } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styles from "@sambego/storybook-styles";
import chaptersAddon from "react-storybook-addon-chapters";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

import * as Icons from "../icons";
import Heading from "../Heading";
import Text from "../Text";
import Loading from "../Loading";
import Button from "../Button";
import CardHeader from "./CardHeader";
import CardSection from "./CardSection";
import SPACINGS_AFTER from "../common/getSpacingToken/consts";
import RenderInRtl from "../utils/rtl/RenderInRtl";
import CardSectionHeader from "./CardSection/CardSectionHeader";
import CardSectionContent from "./CardSection/CardSectionContent";
import Clock from "../icons/Clock";
import CarrierLogo from "../CarrierLogo";
import Stack from "../Stack";
import Badge from "../Badge";

import Card from "./index";

setAddon(chaptersAddon);

const getIcons = defaultIcon => select("Icon", Object.keys(Icons), defaultIcon);
const getIcon = source => Icons[source];

class DynamicContent extends React.Component {
  state = {
    contents: [],
  };

  push = () => {
    this.setState({
      contents: this.state.contents.concat(["Test"]),
    });
  };

  render() {
    return (
      <div>
        {this.state.contents.map(() => (
          <div>Kokot</div>
        ))}

        <div onClick={this.push}>Add</div>
      </div>
    );
  }
}

storiesOf("Card", module)
  .addDecorator(withKnobs)
  .addDecorator(
    styles({
      padding: "20px",
    }),
  )
  .addWithChapters("Default", () => {
    const title = text("Title", "Card with title");
    const description = text("Description");
    return {
      info: "This is the default configuration of this component.",
      chapters: [
        {
          sections: [
            {
              sectionFn: () => (
                <Card>
                  <CardHeader icon={<Icons.Airplane />} title={title} subTitle={description} />
                </Card>
              ),
            },
          ],
        },
      ],
    };
  })
  .addWithChapters("Card with description", () => {
    const title = text("Title", "Card with title & description");
    const description = text("Description", "This is a description of the card.");
    return {
      info:
        "Card component is a simple container for grouping some relevant information. It’s possible to add title and description. Visit Orbit.Kiwi for more detailed guidelines.",
      chapters: [
        {
          sections: [
            {
              sectionFn: () => (
                <Card>
                  <CardHeader icon={<Icons.Airplane />} title={title} subTitle={description} />
                </Card>
              ),
            },
          ],
        },
      ],
    };
  })
  .addWithChapters("Card with only section", () => {
    const content = text("Content", "This is a content of the card.");
    return {
      info:
        "Card component is a simple container for grouping some relevant information. You can add a content to Card. Visit Orbit.Kiwi for more detailed guidelines.",
      chapters: [
        {
          sections: [
            {
              sectionFn: () => (
                <Card>
                  <CardSection>
                    <Text>{content}</Text>
                  </CardSection>
                </Card>
              ),
            },
          ],
        },
      ],
    };
  })
  .addWithChapters("Card with sections", () => {
    const title = text("Title", "Card with sections");
    const description = text("Description", "This is a description of the card.");
    return {
      info:
        "Card sections allow you to create separate sections in every card when you need to create more advanced content structure. Visit Orbit.Kiwi for more detailed guidelines.",
      chapters: [
        {
          sections: [
            {
              sectionFn: () => (
                <Card>
                  <CardSection>
                    <Heading type="title3" element="h3">
                      {title}
                    </Heading>
                    <Text>{description}</Text>
                  </CardSection>
                  <CardSection>
                    <Heading type="title3" element="h3">
                      {title}
                    </Heading>
                    <Text>{description}</Text>
                  </CardSection>
                  <CardSection>
                    <Heading type="title3" element="h3">
                      {title}
                    </Heading>
                    <Text>{description}</Text>
                  </CardSection>
                </Card>
              ),
            },
          ],
        },
      ],
    };
  })
  .addWithChapters("Card with expandable sections", () => {
    const title = text("Title", "Card with sections");
    const description = text("Description", "This is a description of the card.");
    return {
      info:
        "Card sections allow you to create separate sections in every card when you need to create more advanced content structure. Visit Orbit.Kiwi for more detailed guidelines.",
      chapters: [
        {
          sections: [
            {
              sectionFn: () => (
                <Card>
                  <CardHeader title={title} subTitle={description} />
                  <CardSection expandable>
                    <CardSectionHeader>
                      <Heading type="title3" element="h3">
                        {title}
                      </Heading>
                    </CardSectionHeader>
                    <CardSectionContent>
                      <Text>{description}</Text>
                    </CardSectionContent>
                  </CardSection>
                  <CardSection expandable>
                    <CardSectionHeader>
                      <Heading type="title3" element="h3">
                        {title}
                      </Heading>
                    </CardSectionHeader>
                    <CardSectionContent>
                      <Text>{description}</Text>
                    </CardSectionContent>
                  </CardSection>
                  <CardSection expandable>
                    <CardSectionHeader>
                      <Heading type="title3" element="h3">
                        {title}
                      </Heading>
                      <Text>{description}</Text>
                    </CardSectionHeader>
                    <CardSectionContent>
                      <Text>{description}</Text>
                    </CardSectionContent>
                  </CardSection>
                </Card>
              ),
            },
          ],
        },
      ],
    };
  })
  .addWithChapters("Card with default expanded", () => {
    const initialExpanded = boolean("initialExpended", true);
    return {
      info:
        "Card sections allow you to create separate sections in every card when you need to create more advanced content structure. Visit Orbit.Kiwi for more detailed guidelines.",
      chapters: [
        {
          sections: [
            {
              sectionFn: () => (
                <Card>
                  <CardSection expandable>
                    <CardSectionHeader>
                      <Stack direction="row" align="center" justify="between">
                        <div>
                          <CarrierLogo size="large" carriers={[{ code: "FR", name: "Ryanair" }]} />
                        </div>
                        <div>
                          <Stack direction="row" align="center">
                            <Text type="secondary">Trip length: 1h55m</Text>
                            <Badge icon={<Clock />} type="warning">
                              Unavailable
                            </Badge>
                          </Stack>
                        </div>
                      </Stack>
                    </CardSectionHeader>
                    <CardSectionContent>Hidden content</CardSectionContent>
                  </CardSection>
                  <CardSection expandable initialExpanded onExpand={action("onExpand")} onClose={action("onClose")}>
                    <CardSectionHeader
                      actions={
                        <div>
                          <Button type="secondary" size="small">
                            Close
                          </Button>
                        </div>
                      }
                    >
                      <Stack direction="row" align="center" justify="between">
                        <div>
                          <CarrierLogo size="large" carriers={[{ code: "FR", name: "Ryanair" }]} />
                        </div>
                        <div>
                          <Stack direction="row" align="center">
                            <Text type="secondary">Trip length: 1h55m</Text>
                          </Stack>
                        </div>
                      </Stack>
                    </CardSectionHeader>
                    <CardSectionContent>
                      <DynamicContent />
                    </CardSectionContent>
                  </CardSection>
                </Card>
              ),
            },
          ],
        },
      ],
    };
  })
  .addWithChapters("Card with mixed sections", () => {
    const title = text("Title", "Card with sections");
    const description = text("Description", "This is a description of the card.");
    return {
      info:
        "Card sections allow you to create separate sections in every card when you need to create more advanced content structure. Visit Orbit.Kiwi for more detailed guidelines.",
      chapters: [
        {
          sections: [
            {
              sectionFn: () => (
                <Card>
                  <CardHeader title={title} subTitle={description} />
                  <CardSection>
                    <CardSectionHeader>
                      <Heading type="title3" element="h3">
                        {title}
                      </Heading>
                      <Text>Test</Text>
                    </CardSectionHeader>
                    <CardSectionContent>{description}</CardSectionContent>
                  </CardSection>
                  <CardSection expandable>
                    <CardSectionHeader>
                      <Heading type="title3">{title}</Heading>
                    </CardSectionHeader>
                    <CardSectionContent>{description}</CardSectionContent>
                  </CardSection>
                  <CardSection>
                    <CardSectionHeader>
                      <Heading type="title3">{title}</Heading>
                    </CardSectionHeader>
                    <CardSectionContent>{description}</CardSectionContent>
                  </CardSection>
                </Card>
              ),
            },
          ],
        },
      ],
    };
  })
  .addWithChapters("Loading Card", () => ({
    info:
      "Card sections allow you to create separate sections in every card when you need to create more advanced content structure. Visit Orbit.Kiwi for more detailed guidelines.",
    chapters: [
      {
        sections: [
          {
            sectionFn: () => (
              <Card>
                <Loading type="boxLoader" loading>
                  {true && (
                    <React.Fragment>
                      <CardHeader title="Test" />
                      <CardSection>kek</CardSection>
                    </React.Fragment>
                  )}
                </Loading>
              </Card>
            ),
          },
        ],
      },
    ],
  }))
  .addWithChapters("Playground", () => {
    const title = text("Title", "Customisable card title");
    const description = text("Description", "This is a customisable description of the card.");
    const Icon = getIcon(getIcons("Airplane"));
    const closable = boolean("Closable", false);
    const dataTest = text("dataTest", "test");
    const spaceAfter = select("spaceAfter", [undefined, ...Object.values(SPACINGS_AFTER)]);
    return {
      info:
        "You can try all possible configurations of this component. However, check Orbit.Kiwi for more detailed design guidelines.",
      chapters: [
        {
          sections: [
            {
              sectionFn: () => (
                <Card
                  closable={closable}
                  onClose={action("Close")}
                  dataTest={dataTest}
                  spaceAfter={spaceAfter}
                >
                  <CardHeader
                    icon={<Icon />}
                    title={title}
                    subTitle={description}
                    dataTest={dataTest}
                  />
                  <CardSection dataTest={dataTest}>
                    <Heading type="title3" element="h3">
                      Content with Heading and text
                    </Heading>
                    <Text>Text in content</Text>
                  </CardSection>
                  <CardSection dataTest={dataTest}>
                    <Heading type="title3" element="h3">
                      Section with Heading and text
                    </Heading>
                    <Text>Text in section</Text>
                  </CardSection>
                </Card>
              ),
            },
          ],
        },
      ],
    };
  })
  .addWithChapters("RTL", () => ({
    info: "This is a preview of this component in RTL setup.",
    chapters: [
      {
        sections: [
          {
            sectionFn: () => (
              <RenderInRtl>
                <Card closable onClose={action("Close")}>
                  <CardHeader
                    icon={<Icons.Airplane />}
                    title="Title of the CardHeader"
                    subTitle="Description of the CardHeader"
                  />
                  <CardSection>
                    <Heading type="title3" element="h3">
                      Content with Heading and text
                    </Heading>
                    <Text>Text in content</Text>
                  </CardSection>
                  <CardSection>
                    <Heading type="title3" element="h3">
                      Section with Heading and text
                    </Heading>
                    <Text>Text in section</Text>
                  </CardSection>
                  <CardSection expandable>
                    <CardSectionHeader>
                      <Heading type="title3" element="h3">
                        Content with Heading and text
                      </Heading>
                      <Text>Text in content</Text>
                    </CardSectionHeader>
                    <CardSectionContent>
                      <Text>Text in content</Text>
                    </CardSectionContent>
                  </CardSection>

                  <CardSection expandable initialExpanded>
                    <CardSectionHeader actions={<Button size="small">Action</Button>}>
                      <Heading type="title3" element="h3">
                        Content with Heading and text
                      </Heading>
                      <Text>Text in content</Text>
                    </CardSectionHeader>
                    <CardSectionContent>
                      <Text>Text in content</Text>
                    </CardSectionContent>
                  </CardSection>
                </Card>
              </RenderInRtl>
            ),
          },
        ],
      },
    ],
  }));
