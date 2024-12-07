import {
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  inject,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { trigger, style, transition, animate } from "@angular/animations";
import { DataService } from "./data.service";
import { CommonModule } from "@angular/common";
import { ConvertTextToHtmlPipe } from "./convert-text-to-html.pipe";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { GeminiConfig } from "./chat-form";
import { API_KEY_CONF } from "../config";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ConvertTextToHtmlPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  animations: [
    trigger("typeWritterEffect", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("2s", style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  @ViewChild("messagesContainer") private messagesContainer!: ElementRef;
  private dataService = inject(DataService);
  public messagesHistory: { role: string; parts: string }[] = [];
  public userMessage!: string | null;
  public loading = false;
  public loadingTemplate!: TemplateRef<any>;

  public gQuestions = [
    "Dime noticias?",
    "Que es Angular?",
    "Que hay de nuevo en Gemini?",
  ];
  public bQuestions = [
    "Dime acerca de ti?",
    "Que cosas puedes hacer?",
    "Cual es tu direccion de Correo?",
  ];

  public characterSelection = [
    {
      id: 0,
      value: "GDG Workshop",
    },
    {
      id: 1,
      value: "Gemini",
    },
  ];

  temperatureOptions = [
    { value: 0.2, label: "Poco Creativo" },
    { value: 0.5, label: "Moderadamente Creativito" },
    { value: 0.9, label: "Altamente Creativito" },
  ];

  modelOptions = [
    { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
    { label: "Gemini 1.5 Flash-8B(Alto Volumen)", value: "gemini-1.5-flash-8b" },
    {
      label: "Gemini 1.5 Pro",
      value: "gemini-1.5-pro",
      disabled: false,
    },
  ];

  chatForm = new FormGroup({
    apiKey: new FormControl(API_KEY_CONF || ""),
    temperature: new FormControl(this.temperatureOptions[2].value),
    bot: new FormControl(this.characterSelection[0]),
    model: new FormControl(this.modelOptions[0].value),
  });

  sendMessage(message: string) {
    if (!message || this.loading) return;
    setTimeout(() => this.scrollToBottom(), 0);
    this.loading = true;
    this.messagesHistory.push(
      {
        role: "user",
        parts: message,
      },
      {
        role: "model",
        parts: "",
      }
    );
    this.dataService
      .generateContentWithGeminiPro(
        message,
        this.messagesHistory,
        this.chatForm.value as GeminiConfig
      )
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.userMessage = null;
          this.messagesHistory = this.messagesHistory.slice(0, -2);
          this.messagesHistory.push(
            {
              role: "user",
              parts: message,
            },
            {
              role: "model",
              parts: res,
            }
          );
          setTimeout(() => this.scrollToBottom(), 0);
        },
        error: (error) => {
          this.loading = false;
          console.error("Error generando contenido:", error);
          this.messagesHistory.push({
            role: "model",
            parts: "Disculpa, algo salio mal . vuelve a intentarlo.",
          });
          setTimeout(() => this.scrollToBottom(), 0);
        },
      });
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
}
